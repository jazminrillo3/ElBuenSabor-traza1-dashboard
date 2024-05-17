import * as Yup from "yup";
import { FC } from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import {
	InputAdornment,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Formik, FormikValues, useFormikContext } from "formik";
import { ErrorTypography, TextFieldStack } from "../styled/StyledForm";
import { Switch } from "../styled/StyledSwitch";
import { useAppSelector } from "../../../redux/hooks";

export const ArticuloElaborarForm: FC = () => {
	const { values, setFieldValue, errors } = useFormikContext<FormikValues>();

	const categorias = useAppSelector(
		(state) => state.selectedData.categoriasSucursal
	);

	let articuloSchema = Yup.object().shape({
		esParaElaborar: Yup.boolean().required("Este campo es requerido."),
		precioVenta: Yup.number().required("Este campo es requerido."),
		categoria: Yup.string().required("Este campo es requerido."),
	});

	return (
		<Formik
			initialValues={values}
			validationSchema={articuloSchema}
			onSubmit={() => {}}
		>
			{({ touched, handleBlur }) => (
				<Stack width="100%" spacing={3}>
					<Stack spacing={2}>
						<Stack alignItems="center" spacing={2}>
							<Typography>¿Es para elaborar?</Typography>
							<Switch
								name="esParaElaborar"
								checked={values["esParaElaborar"]}
								onChange={(event) =>
									setFieldValue("esParaElaborar", event.target.checked)
								}
							/>
							{touched["esParaElaborar"] && errors["esParaElaborar"] && (
								<ErrorTypography>
									{String(errors["esParaElaborar"])}
								</ErrorTypography>
							)}
						</Stack>
					</Stack>

					{!values["esParaElaborar"] && (
						<Stack direction="row" spacing={2}>
							<TextFieldStack alignItems="center" spacing={1} width="100%">
								<Typography>Precio venta</Typography>
								<TextField
									type="number"
									fullWidth
									placeholder="Precio de venta"
									name="precioVenta"
									value={values["precioVenta"]}
									onChange={(event) =>
										setFieldValue("precioVenta", event.target.value)
									}
									onBlur={handleBlur}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<MonetizationOnIcon />
											</InputAdornment>
										),
									}}
								/>
								{touched["precioVenta"] && errors["precioVenta"] && (
									<ErrorTypography>
										{String(errors["precioVenta"])}
									</ErrorTypography>
								)}
							</TextFieldStack>
							<TextFieldStack alignItems="center" spacing={1} width="100%">
								<Typography>Categoría</Typography>
								{/*ver TreeView*/}
								<Select
									fullWidth
									name="categoria"
									value={values["categoria"]}
									onChange={(event) =>
										setFieldValue("categoria", event.target.value)
									}
									onBlur={handleBlur}
									startAdornment={
										<InputAdornment position="start">
											<LocalOfferIcon />
										</InputAdornment>
									}
								>
									{categorias!.map((categoria, index) => (
										<MenuItem key={index} value={categoria.id}>
											{categoria.denominacion}
										</MenuItem>
									))}
								</Select>
								{touched["categoria"] && errors["categoria"] && (
									<ErrorTypography>
										{String(errors["categoria"])}
									</ErrorTypography>
								)}
							</TextFieldStack>
						</Stack>
					)}
				</Stack>
			)}
		</Formik>
	);
};