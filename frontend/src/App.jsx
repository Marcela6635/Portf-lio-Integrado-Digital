import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Secao from "./pages/Secao";
import Navbar from "./components/Navbar";
import Registros from "./pages/Registros";
import DetalhesRegistro from "./pages/DetalhesRegistro";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import CadastrarSecao from "./pages/CadastrarSecao";
import CadastrarMaterial from "./pages/CadastrarMaterial";
import CadastrarRegistro from "./pages/CadastrarRegistro";
import GerenciarSecoes from "./pages/GerenciarSecoes";
import GerenciarRegistros from "./pages/GerenciarRegistros";
import EditarSecao from "./pages/EditarSecao";
import EditarRegistro from "./pages/EditarRegistro";
import GerenciarMateriais from "./pages/GerenciarMateriais";
import EditarMaterial from "./pages/EditarMaterial";
import RotaProtegida from "./pages/RotaProtegida";
import SobreMim from "./pages/SobreMim";
import Footer from "./components/Footer";

function App() {
  return(
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-mim" element={<SobreMim/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/sesi" element={<Secao origem="SESI" />} />
        <Route path="/senai" element={<Secao origem="SENAI" />} />
        <Route path="/sesi/:area" element={<Secao origem="SESI" />} />
        <Route path="/senai/:area" element={<Secao origem="SENAI" />} />
        <Route path="/registros/:id" element={<Registros/>}/>
        <Route path="/registro/:id" element={<DetalhesRegistro/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route element={<RotaProtegida/>}>

        <Route path="/admin" element={<Admin/>}/>

        <Route path="/admin/secoes" element={<GerenciarSecoes/>}/>
        <Route path="/admin/secoes/nova" element={<CadastrarSecao/>}/>
        <Route path="/admin/secoes/editar/:id" element={<EditarSecao/>}/>
       
        <Route path="/admin/registros" element={<GerenciarRegistros/>}/>
        <Route path="/admin/registros/novo" element={<CadastrarRegistro/>}/>
        <Route path="/admin/registros/editar/:id" element={<EditarRegistro/>}/>

        <Route path="/admin/materiais" element={<GerenciarMateriais/>}/>
        <Route path="/admin/materiais/novo" element={<CadastrarMaterial/>}/>
        <Route path="/admin/materiais/editar/:id" element={<EditarMaterial/>}/>

        </Route>

      </Routes>

      <Footer/>
    </>
  )
}

export default App;
