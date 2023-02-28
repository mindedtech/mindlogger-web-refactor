import { useNavigate } from "react-router-dom"

import { AppletListItem } from "../lib"

import { CustomCard } from "~/shared/ui"
import { ROUTES } from "~/shared/utils"

interface AppletCardProps {
  applet: AppletListItem
}

const AppletCard = ({ applet }: AppletCardProps) => {
  const navigate = useNavigate()

  const onAppletCardClick = () => {
    navigate(ROUTES.activityList.navigateTo(applet.id))
  }

  return (
    <CustomCard
      type="link"
      id={applet.id}
      title={applet.displayName}
      description={applet.description}
      imageSrc={applet.image}
      onClick={onAppletCardClick}
    />
  )
}

export default AppletCard
