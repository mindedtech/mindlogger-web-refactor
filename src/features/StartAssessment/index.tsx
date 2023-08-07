import ButtonBase from "@mui/material/ButtonBase"
import Typography from "@mui/material/Typography"

import { Theme } from "~/shared/constants"
import { useCustomTranslation } from "~/shared/utils"

type Props = {
  width: string
  onClick: () => void
}

export const StartAssessmentButton = ({ width, onClick }: Props) => {
  const { t } = useCustomTranslation()

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        padding: "10px 24px",
        backgroundColor: Theme.colors.light.primary,
        width,
        borderRadius: "100px",
      }}>
      <Typography variant="body1" color={Theme.colors.light.onPrimary} fontSize="14px" fontWeight="700">
        {t("start")}
      </Typography>
    </ButtonBase>
  )
}
