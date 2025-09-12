<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::with('user', 'items.product')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'total' => 'required|numeric|min:0',
            'status' => 'required|string',
            'payment_method' => 'nullable|string',
            'transaction_id' => 'nullable|string',
            'shipping_address' => 'required|string',
            'phone' => 'required|string'
        ]);

        $order = Order::create($validated);
        return response()->json($order, 201);
    }

    public function show($id)
    {
        $order = Order::with('user', 'items.product')->find($id);
        if (!$order) {
            return response()->json(['message' => 'Commande non trouvée'], 404);
        }
        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Commande non trouvée'], 404);
        }

        $validated = $request->validate([
            'status' => 'sometimes|required|string',
            'payment_method' => 'nullable|string',
            'transaction_id' => 'nullable|string',
            'shipping_address' => 'sometimes|required|string',
            'phone' => 'sometimes|required|string'
        ]);

        $order->update($validated);
        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Commande non trouvée'], 404);
        }

        $order->delete();
        return response()->json(['message' => 'Commande supprimée']);
    }
}