import BotonProfile from "../../partials/Users/BotonProfile";
import Button from "../../partials/Button/Button";
import "./Header.css";
import useAuth from "@servicios/UseAuth";
import { useNavigate } from "react-router-dom";
import { perfil } from "@constantes/constUsers";

const HeaderLogged = (props) => {
  const miSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="34.18"
      height="34.18"
      viewBox="0 0 34.18 34.18"
    >
      <defs>
        <clipPath id="clip-path">
          <path
            id="Trazado_119"
            data-name="Trazado 119"
            d="M5.07,5.07H39.25V39.25H5.07Zm0,0"
            transform="translate(-5.07 -5.07)"
            fill="#fff"
          />
        </clipPath>
      </defs>
      <g id="icon" clip-path="url(#clip-path)">
        <path
          id="Trazado_118"
          data-name="Trazado 118"
          d="M22.52,5.289a17.037,17.037,0,0,0-12.567,5.5l-2.4-1.521a1.122,1.122,0,0,0-.56-.16,1.077,1.077,0,0,0-1.067,1.014L5.5,19.7a1.083,1.083,0,0,0,1.067,1.121.963.963,0,0,0,.507-.133l8.538-4.456a1.065,1.065,0,0,0,.08-1.841l-2.028-1.281a12.813,12.813,0,1,1-3.9,10.432L5.71,25.621A17.122,17.122,0,1,0,22.52,5.289Zm0,0"
          transform="translate(-5.47 -5.276)"
          fill="#fff"
        />
      </g>
    </svg>
  );

  const { seccionTicket, handleSeccion, user } = useAuth();
  const { TECNICO } = perfil;
  const navigate = useNavigate();
  const redirectTickets = () => {
    handleSeccion();
    navigate("/tickets");
  };
  const redirectTramites = () => {
    handleSeccion();
    navigate("/tramites");
  };
  const classColorHeaderBackground = seccionTicket
    ? "backgroundTicket"
    : "backgroundTramite";
  return (
    <header className={`header ${classColorHeaderBackground}`}>
      <nav className="navbar-header" role="navigation">
        {!props.showNav && (
          <a
            className="menu-nav-h"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Icon-only"
            onClick={() => {
              props.setShowNav(true);
            }}
          >
            <img
              className="menu-bars"
              id="icon-menu"
              src="/public/img/bars-solid.svg"
            ></img>
            <span className="visually-hidden">Icon-only</span>
          </a>
        )}
        <div className="container-header">
          <div>
            <div className="navbar-header">
              <a
                className="navbar-brand"
                aria-label="Argentina.gob.ar Presidencia de la Nación"
              >
                <img
                  alt="Argentina.gob.ar"
                  src="/img/logo-mini-des.svg"
                  height={55}
                />

                <img alt="CAI" src="/img/CAI.svg" height={40} />
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end w-25 pe-3 fw-bold text-white">
          {!seccionTicket ? "Ir a Tickets" : "Ir a Tramites"}
        </div>
        <div className="header-buttons">
          {user.perfil !== TECNICO &&
            (seccionTicket ? (
              <Button
                type="button"
                texto="Tramites"
                classBoton="switch-tramites"
                onClick={redirectTramites}
              />
            ) : (
              <Button
                type="button"
                texto="Tickets"
                classBoton="switch-tickets"
                onClick={redirectTickets}
              />
            ))}
          <BotonProfile />
        </div>
      </nav>
    </header>
  );
};

export default HeaderLogged;
