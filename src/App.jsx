import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Home from '@/pages/Home';
import Comunicar from '@/pages/Comunicar';
import Acompanhar from '@/pages/Acompanhar';
import MinhasOcorrencias from '@/pages/MinhasOcorrencias';
import Notificacoes from '@/pages/Notificacoes';
import Perfil from '@/pages/Perfil';
import Mapa from '@/pages/Mapa';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminOcorrencia from '@/pages/admin/AdminOcorrencia';
import AdminTrabalhos from '@/pages/admin/AdminTrabalhos';
import CadastroTalento from '@/pages/CadastroTalento';
import Oportunidades from '@/pages/Oportunidades';
import MeusTrabalhos from '@/pages/MeusTrabalhos';
import Ganhos from '@/pages/Ganhos';
import Servicos from '@/pages/Servicos';
import ServicoDetalhe from '@/pages/ServicoDetalhe';
import PublicarServico from '@/pages/PublicarServico';
import MeusServicos from '@/pages/MeusServicos';
import Planos from '@/pages/Planos';
import Contratos from '@/pages/Contratos';
import AdminLevantamentos from '@/pages/admin/AdminLevantamentos';
import AdminSubscricoes from '@/pages/admin/AdminSubscricoes';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}
      >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/comunicar" element={<Comunicar />} />
          <Route path="/acompanhar" element={<Acompanhar />} />
          <Route path="/minhas" element={<MinhasOcorrencias />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/oportunidades" element={<Oportunidades />} />
          <Route path="/meus-trabalhos" element={<MeusTrabalhos />} />
          <Route path="/ganhos" element={<Ganhos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/servicos/:id" element={<ServicoDetalhe />} />
          <Route path="/publicar-servico" element={<PublicarServico />} />
          <Route path="/meus-servicos" element={<MeusServicos />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/talento" element={<CadastroTalento />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/ocorrencia/:id" element={<AdminOcorrencia />} />
            <Route path="/admin/trabalhos" element={<AdminTrabalhos />} />
            <Route path="/admin/levantamentos" element={<AdminLevantamentos />} />
            <Route path="/admin/subscricoes" element={<AdminSubscricoes />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
