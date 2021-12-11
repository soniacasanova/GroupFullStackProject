import React, { useState } from 'react';
import * as api from '../api';
import './LoginPage.css';
import Title from '../components/Title';


function LoginPage({ onLogin }) {
  const [valuer_id, setValuerId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "none" });

  const login = async (e) => {
    e.preventDefault();
    try {
      const { error, accessToken } = await api.login({ valuer_id, password });
      if (error) {
        setMessage({ type: "error", text: error });
      } else {
        onLogin(accessToken);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.toString() })
    }
  };
  
  return (    
    <div>
      <div className="nav-f">
      <Title />
      </div>
      <div className="login-page">
        <div id="image-form">
          <div className="myImage"> </div>
        </div>
        <div id="form-login">
          <div><h2>Iniciar sessió</h2></div>
          <form class="form-display" onSubmit={login}>
            <label className="form-label">
              <div>Usuari</div>
              <input className="form-input" id="user" type="text" value={valuer_id} onChange={(e) => setValuerId(e.target.value)} />
            </label>
            <label className="form-label">
              <div>Contrasenya</div>
              <input className="form-input" id="key" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <div className="btn">
              <input className="submit-btn" type="submit" value="Entra" />
            </div>        
          </form>
          <div className={`message ${message.type}`}>{message.text}</div>
        </div>
      </div>
    </div>    
  )
}

export default LoginPage;