import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// === PAGES PUBLIQUES ===
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Trainings from './pages/Trainings';
import TrainingDetail from './pages/TrainingDetail';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// === PAGES D'ADMINISTRATION ===
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import AdminProducts from './pages/Dashboard/AdminProducts';
import AddProduct from './pages/Dashboard/AddProduct';
import EditProduct from './pages/Dashboard/EditProduct';
import ViewProduct from './pages/Dashboard/ViewProduct';
import AdminCategories from './pages/Dashboard/AdminCategories';
import AddCategory from './pages/Dashboard/AddCategory';
import EditCategory from './pages/Dashboard/EditCategory';
import AdminTrainings from './pages/Dashboard/AdminTrainings';
import AddTraining from './pages/Dashboard/AddTraining';
import EditTraining from './pages/Dashboard/EditTraining';
import AdminApplications from './pages/Dashboard/AdminApplications';
import AdminBlog from './pages/Dashboard/AdminBlog';
import AddBlogPost from './pages/Dashboard/AddBlogPost';
import EditBlogPost from './pages/Dashboard/EditBlogPost';

// === COMPOSANTS GLOBAUX ===
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartWidget from './components/CartWidget';
import { useState } from 'react';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <main className="flex-1">
          <Routes>
            {/* === ROUTES PUBLIQUES === */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path="/trainings/:id" element={<TrainingDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* === ESPACE ADMIN === */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
            <Route path="/admin/products/view/:id" element={<ViewProduct />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/categories/add" element={<AddCategory />} />
            <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
            <Route path="/admin/trainings" element={<AdminTrainings />} />
            <Route path="/admin/trainings/add" element={<AddTraining />} />
            <Route path="/admin/trainings/edit/:id" element={<EditTraining />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/blog/add" element={<AddBlogPost />} />
            <Route path="/admin/blog/edit/:id" element={<EditBlogPost />} />

            {/* === PAGE 404 === */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CartWidget isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}