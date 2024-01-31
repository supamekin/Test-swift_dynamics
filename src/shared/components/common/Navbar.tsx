import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import "./style/navbar.scss"

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    if(searchParams.get("lang")){
      handleChangeLang(searchParams.get("lang")??"th")
    }
  },[searchParams.get("lang")])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLang = (lg: string) => {
  i18n.changeLanguage(lg)
  };


  return (
    <header className="header">
      <div className="container-header">
        <nav className="navbar">Navbar</nav>
        <div className="nav-linkn">
          <ul className="navContainer-linkn">
            <li><a className="linkn" href="#">{t('HOME')}</a></li>
            <li><a className="linkn" href="#">{t('PORTFOLIO')}</a></li>
            <li><a className="linkn" href="#">{t('ABOUT')}</a></li>
            <li><a className="linkn" href="#">{t('BLOG')}</a></li>
          </ul>
        </div>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <LanguageIcon className="LanguageIcon" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => setSearchParams({lang:"th"})}>Th</MenuItem>
            <MenuItem onClick={() => setSearchParams({lang:"en"})}>En</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
