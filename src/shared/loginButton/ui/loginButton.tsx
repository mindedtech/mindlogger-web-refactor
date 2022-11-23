import Nav from "react-bootstrap/Nav"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../app/system/routes/constants"

const LoginButton = (): JSX.Element | null => {
  const { t } = useTranslation("translation", { keyPrefix: "Navbar" })
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate(ROUTES.login.path)
  }

  return <Nav.Link onClick={onClickHandler}>{t("logIn")}</Nav.Link>
}

export default LoginButton
