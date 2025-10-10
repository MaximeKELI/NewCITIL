<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Register a new account.
     */
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name'     => 'required|string|min:4',
                'email'    => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $user = User::create([
                'name'     => $validated['name'],
                'email'    => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role'     => 'client',
            ]);

            // Créer un token pour l'utilisateur nouvellement inscrit
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'response_code' => 201,
                'status'        => 'success',
                'message'       => 'Inscription réussie !',
                'user_info'     => [
                    'id'     => $user->id,
                    'name'   => $user->name,
                    'email'  => $user->email,
                    'phone'  => $user->phone,
                    'avatar' => $user->avatar ? Storage::url('avatars/' . $user->avatar) : null,
                    'role'   => $user->role,
                ],
                'token'       => $token,
                'token_type'  => 'Bearer',
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'response_code' => 422,
                'status'        => 'error',
                'message'       => 'Echec de la validation',
                'errors'        => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Registration Error: ' . $e->getMessage());

            return response()->json([
                'response_code' => 500,
                'status'        => 'error',
                'message'       => 'Inscription échouée !',
            ], 500);
        }
    }

    /**
     * Login and return auth token.
     */
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email'    => 'required|email',
                'password' => 'required|string',
            ]);

            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'response_code' => 401,
                    'status'        => 'error',
                    'message'       => 'Identifiants incorrects !',
                ], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'response_code' => 200,
                'status'        => 'success',
                'message'       => 'Connexion réussie !',
                'user_info'     => [
                    'id'     => $user->id,
                    'name'   => $user->name,
                    'email'  => $user->email,
                    'phone'  => $user->phone,
                    'avatar' => $user->avatar ? Storage::url('avatars/' . $user->avatar) : null,
                    'role'   => $user->role,
                ],
                'token'       => $token,
                'token_type'  => 'Bearer',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'response_code' => 422,
                'status'        => 'error',
                'message'       => 'Echec de la validation',
                'errors'        => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Login Error: ' . $e->getMessage());

            return response()->json([
                'response_code' => 500,
                'status'        => 'error',
                'message'       => 'Connexion échouée !',
            ], 500);
        }
    }

    /**
     * Get current user info — protected route.
     */
    public function userInfo(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'response_code' => 401,
                    'status'        => 'error',
                    'message'       => 'Utilisateur non authentifié',
                ], 401);
            }

            return response()->json([
                'response_code' => 200,
                'status'        => 'success',
                'message'       => 'Informations utilisateur récupérées avec succès',
                'user_info'     => [
                    'id'     => $user->id,
                    'name'   => $user->name,
                    'email'  => $user->email,
                    'phone'  => $user->phone,
                    'avatar' => $user->avatar ? Storage::url('avatars/' . $user->avatar) : null,
                    'role'   => $user->role,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('User Info Error: ' . $e->getMessage());

            return response()->json([
                'response_code' => 500,
                'status'        => 'error',
                'message'       => 'Échec de la récupération des informations utilisateur',
            ], 500);
        }
    }

    /**
     * Update user profile — protected route.
     */
    public function updateProfile(Request $request)
    {
        try {
            $user = $request->user();
            
            $validated = $request->validate([
                'name' => 'sometimes|string|min:2|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
                'phone' => 'sometimes|nullable|string|max:20',
                'avatar' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'current_password' => 'required_with:new_password',
                'new_password' => 'sometimes|string|min:8|confirmed',
            ]);

            // Update basic info
            if (isset($validated['name'])) {
                $user->name = $validated['name'];
            }
            if (isset($validated['email'])) {
                $user->email = $validated['email'];
            }
            if (isset($validated['phone'])) {
                $user->phone = $validated['phone'];
            }

            // Update avatar if provided
            if ($request->hasFile('avatar')) {
                // Supprimer l'ancien avatar s'il existe
                if ($user->avatar && Storage::exists('avatars/' . $user->avatar)) {
                    Storage::delete('avatars/' . $user->avatar);
                }
                
                // Stocker le nouvel avatar
                $avatarFile = $request->file('avatar');
                $avatarName = time() . '_' . $user->id . '.' . $avatarFile->getClientOriginalExtension();
                $avatarFile->storeAs('avatars', $avatarName);
                $user->avatar = $avatarName;
            }

            // Update password if provided
            if (isset($validated['new_password'])) {
                if (!Hash::check($validated['current_password'], $user->password)) {
                    return response()->json([
                        'response_code' => 400,
                        'status' => 'error',
                        'message' => 'Le mot de passe actuel est incorrect',
                    ], 400);
                }
                $user->password = Hash::make($validated['new_password']);
            }

            $user->save();

            return response()->json([
                'response_code' => 200,
                'status' => 'success',
                'message' => 'Profil mis à jour avec succès',
                'user_info' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'avatar' => $user->avatar ? Storage::url('avatars/' . $user->avatar) : null,
                    'role' => $user->role,
                ],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'response_code' => 422,
                'status' => 'error',
                'message' => 'Données invalides',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Profile Update Error: ' . $e->getMessage());

            return response()->json([
                'response_code' => 500,
                'status' => 'error',
                'message' => 'Erreur lors de la mise à jour du profil',
            ], 500);
        }
    }

    /**
     * Logout user and revoke tokens — protected route.
     */
    public function logOut(Request $request)
    {
        try {
            $user = $request->user();

            if ($user) {
                $user->tokens()->delete();

                return response()->json([
                    'response_code' => 200,
                    'status'        => 'success',
                    'message'       => 'Vous êtes déconnecté !',
                ]);
            }

            return response()->json([
                'response_code' => 401,
                'status'        => 'error',
                'message'       => 'User not authenticated',
            ], 401);
        } catch (\Exception $e) {
            Log::error('Logout Error: ' . $e->getMessage());

            return response()->json([
                'response_code' => 500,
                'status'        => 'error',
                'message'       => 'Une erreur est survenue lors de la déconnexion !',
            ], 500);
        }
    }
}