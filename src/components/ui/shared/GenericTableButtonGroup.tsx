import { IconButton, Stack, Tooltip } from "@mui/material";
import { FC } from "react";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useAppSelector } from "../../../redux/hooks";

interface ButtonGroupProps {
	idEntity: number;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
	onAlta?: (id: number) => void;
	onAltaSucursal?: (id: number) => void;
	onSeeDetails: (id: number) => void;
}

const ButtonGroup: FC<ButtonGroupProps> = ({
	idEntity,
	onDelete,
	onEdit,
	onSeeDetails,
	onAlta,
	onAltaSucursal,
}) => {
	const user = useAppSelector((state) => state.auth.user);
	const disabled = user!.rol === "CAJERO";
	return (
		<Stack
			direction="row"
			sx={{ mr: "6px" }}
			spacing={-1}
			justifyContent="center"
		>
			{onEdit && (
				<Tooltip title="Editar">
					<IconButton disabled={disabled} onClick={() => onEdit(idEntity)}>
						<EditIcon
							fontSize="small"
							color={disabled ? "disabled" : "primary"}
						/>
					</IconButton>
				</Tooltip>
			)}
			<Tooltip title="Ver detalles">
				<IconButton onClick={() => onSeeDetails(idEntity)}>
					<VisibilityIcon
						fontSize="small"
						color={onAlta ? "disabled" : "primary"}
					/>
				</IconButton>
			</Tooltip>
			{onDelete && (
				<Tooltip title="Dar de baja">
					<IconButton disabled={disabled} onClick={() => onDelete(idEntity)}>
						<DeleteOutlineIcon
							fontSize="small"
							color={disabled ? "disabled" : "primary"}
						/>
					</IconButton>
				</Tooltip>
			)}
			{onAlta && (
				<Tooltip title="Dar de alta">
					<IconButton disabled={disabled} onClick={() => onAlta(idEntity)}>
						<UpgradeIcon
							fontSize="small"
							color={disabled ? "disabled" : "primary"}
						/>
					</IconButton>
				</Tooltip>
			)}
			{onAltaSucursal && (
				<Tooltip title="Dar de alta en otra sucursal">
					<IconButton disabled={disabled} onClick={() => onAltaSucursal(idEntity)}>
						<UpgradeIcon
							fontSize="small"
							color={disabled ? "disabled" : "primary"}
						/>
					</IconButton>
				</Tooltip>
			)}
		</Stack>
	);
};

export default ButtonGroup;
