import { Box } from "@mui/material";
import { AppRouter } from "./routes/AppRouter";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
	setCategorias,
	setEmpresas,
	setSucursales,
} from "./redux/slices/Business";
import { EmpresaService } from "./services/EmpresaService";
import { SucursalService } from "./services/SucursalService";
import {
	setCategoriasSucursal,
	setSucursal,
	setSucursalesEmpresa,
} from "./redux/slices/SelectedData";
import { CategoriaService } from "./services/CategoriaService";
//INICIAR: json-server --watch public/db.json
//http://localhost:3000/

export const App: FC = () => {
	const dispatch = useAppDispatch();
	const empresaService = new EmpresaService("/empresas");
	const sucursalService = new SucursalService("/sucursales");
	const categoriaService = new CategoriaService("/categorias");

	const sucursales = useAppSelector((state) => state.business.sucursales);
	const categorias = useAppSelector((state) => state.business.categorias);

	const empresa = useAppSelector((state) => state.selectedData.empresa);
	const sucursal = useAppSelector((state) => state.selectedData.sucursal);

	useEffect(() => {
		const traerEmpresas = async () => {
			const empresasData = await empresaService.getAll();
			dispatch(setEmpresas(empresasData));

			const categoriasData = await categoriaService.getAll();
			const categoriasMapeadas = categoriaService.mapCategorias(categoriasData);
			dispatch(setCategorias(categoriasMapeadas));

			const sucursales = await sucursalService.getAll();
			const sucursalesMapeadas = sucursalService.mapSucursales(
				sucursales,
				empresasData
			);
			dispatch(setSucursales(sucursalesMapeadas));
		};

		traerEmpresas();
	}, []);

	useEffect(() => {
		const sucursalesFiltradas = empresa
			? sucursalService.filterByEmpresaId(sucursales ?? [], empresa.id)
			: [];

		dispatch(setSucursalesEmpresa(sucursalesFiltradas));
		dispatch(setSucursal(sucursalesFiltradas[0] ?? null));
	}, [empresa]);

	useEffect(() => {
		const filtrarCategorias = async () => {
			const categoriaSucursal = sucursal
				? await categoriaService.filterBySucursal(categorias ?? [], sucursal.id)
				: [];

			dispatch(setCategoriasSucursal(categoriaSucursal));
		};
		filtrarCategorias();
	}, [sucursal]);

	return (
		<Box
			className="MainContainer"
			sx={{
				maxWidth: "100vw",
				width: "auto",
				minHeight: "100vh",
				maxHeight: "100vh",
				display: "flex",
				flexDirection: "row",
			}}
		>
			<AppRouter />
		</Box>
	);
};

export default App;
