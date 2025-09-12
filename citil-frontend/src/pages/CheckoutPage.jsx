import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Truck, Wallet, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  const [step, setStep] = useState(1); // 1: Adresse, 2: Paiement, 3: Confirmation
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('tmoney');

  const handleNext = () => {
    if (step === 1 && (!address || !phone)) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    setStep(step + 1);
  };

  const handleConfirm = () => {
    setStep(3);
  };

  const getTotalPrice = () => 45000; // Simulé

  if (step === 3) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Commande confirmée !</h1>
        <p className="text-lg text-gray-600 mb-8">
          Votre commande a été prise en compte. Vous recevrez un SMS de confirmation sous peu.
        </p>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Détails de la commande</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Total :</strong> {getTotalPrice().toLocaleString()} FCFA</p>
            <p><strong>Moyen de paiement :</strong> {paymentMethod === 'tmoney' ? 'T-Money (Mixx by YAS)' : 'Flooz (Moov Money)'}</p>
            <p><strong>Livraison :</strong> À votre adresse à Lomé</p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indipo-800">
          <ArrowLeft size={18} /> Retour au panier
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-12">
        {['Adresse', 'Paiement', 'Confirmation'].map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step > index + 1 ? 'bg-green-500 text-white' :
              step === index + 1 ? 'bg-indigo-600 text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              {index + 1}
            </div>
            <span className={`text-sm mt-2 ${step >= index + 1 ? 'text-gray-800' : 'text-gray-500'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Adresse de livraison</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse complète *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ex: Agoè, Rue XYZ, Quartier ABC"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+228 90 01 38 02"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Continuer vers le paiement
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mode de paiement</h2>
          
          <div className="space-y-4 mb-6">
            <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="tmoney"
                checked={paymentMethod === 'tmoney'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="scale-125"
              />
              <Smartphone size={24} className="text-green-600" />
              <div>
                <div className="font-semibold">T-Money (Mixx by YAS)</div>
                <div className="text-sm text-gray-600">Payer avec votre mobile via YAS</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="flooz"
                checked={paymentMethod === 'flooz'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="scale-125"
              />
              <Wallet size={24} className="text-orange-600" />
              <div>
                <div className="font-semibold">Flooz (Moov Money)</div>
                <div className="text-sm text-gray-600">Payer avec votre mobile via Moov</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 opacity-70">
              <input
                type="radio"
                name="payment"
                value="cash"
                disabled
                className="scale-125"
              />
              <Truck size={24} className="text-gray-400" />
              <div>
                <div className="font-semibold">Paiement à la livraison</div>
                <div className="text-sm text-gray-500">Bientôt disponible</div>
              </div>
            </label>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <div className="flex justify-between items-center mb-2">
              <span>Sous-total</span>
              <span>{getTotalPrice().toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Frais de livraison</span>
              <span>Gratuit</span>
            </div>
            <div className="border-t pt-2 font-bold flex justify-between items-center text-lg">
              <span>Total</span>
              <span className="text-indigo-600">{getTotalPrice().toLocaleString()} FCFA</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Retour
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Confirmer la commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
}