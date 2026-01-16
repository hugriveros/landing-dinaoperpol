import { useState } from 'react';
import { MagnifyingGlassIcon, FolderIcon, DocumentTextIcon, XMarkIcon, DocumentIcon, ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';

interface Seccion {
	id: string;
	nombre: string;
	jefe: string;
	color: string;
	documentos: string[];
}

interface Props {
	secciones: Seccion[];
	baseUrl: string;
}

export default function SistemaBusquedaDocumentos({ secciones, baseUrl }: Props) {
	const [busqueda, setBusqueda] = useState('');
	const [mostrarResultadosDropdown, setMostrarResultadosDropdown] = useState(false);

	// Crear lista plana de todos los documentos
	const todosDocumentos = secciones.flatMap(seccion =>
		seccion.documentos.map(doc => ({
			nombre: doc,
			area: seccion.nombre,
			areaColor: seccion.color,
			ruta: `${baseUrl}documentos/${seccion.id}/${doc}`,
			seccionId: seccion.id
		}))
	);

	// Filtrar documentos según búsqueda
	const documentosFiltrados = busqueda.trim() 
		? todosDocumentos.filter(doc => {
			const termino = busqueda.toLowerCase();
			return doc.nombre.toLowerCase().includes(termino) ||
				doc.area.toLowerCase().includes(termino);
		})
		: todosDocumentos;

	const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBusqueda(e.target.value);
		if (e.target.value.trim()) {
			setMostrarResultadosDropdown(true);
		} else {
			setMostrarResultadosDropdown(false);
		}
	};

	const limpiarBusqueda = () => {
		setBusqueda('');
		setMostrarResultadosDropdown(false);
	};

	const formatearNombre = (nombre: string) => {
		return nombre
			.replace(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i, '')
			.replace(/[-_]/g, ' ');
	};

	const getExtension = (nombre: string) => {
		const match = nombre.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i);
		return match ? match[1].toUpperCase() : 'DOC';
	};

	return (
		<div className="space-y-6">
			{/* Barra superior con breadcrumb y búsqueda estilo Windows Explorer */}
			<div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
				<div className="px-6 py-4 flex items-center justify-between gap-6">
					{/* Breadcrumb navigation */}
					<div className="flex items-center gap-2 text-sm flex-shrink-0">
						<HomeIcon className="w-4 h-4 text-slate-500" />
						<span className="text-slate-600 font-medium">DGEA</span>
						<ChevronRightIcon className="w-4 h-4 text-slate-400" />
						
						
						<span className="text-slate-900 font-semibold">DOCUMENTOS DIRNAOERPOL</span>
					</div>

					{/* Barra de búsqueda */}
					<div className="relative flex-1 max-w-md">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
						</div>
						<input
							type="text"
							value={busqueda}
							onChange={handleBusquedaChange}
							onFocus={() => busqueda && setMostrarResultadosDropdown(true)}
							placeholder="Buscar en NORMATIVA DIRNAOERPOL"
							className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
						/>
						{busqueda && (
							<button
								onClick={limpiarBusqueda}
								className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary-green transition-colors"
							>
								<XMarkIcon className="h-5 w-5 text-slate-400 hover:text-slate-600" />
							</button>
						)}

						{/* Resultados dropdown */}
						{mostrarResultadosDropdown && busqueda && (
							<>
								<div className="absolute z-[100] left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-200 max-h-[500px] overflow-y-auto">
									{documentosFiltrados.length > 0 ? (
										<div>
											<div className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide bg-slate-50 border-b border-slate-200">
												{documentosFiltrados.length} resultado{documentosFiltrados.length !== 1 ? 's' : ''} encontrado{documentosFiltrados.length !== 1 ? 's' : ''}
											</div>
											{documentosFiltrados.slice(0, 6).map((doc, index) => (
												<a
													key={index}
													href={doc.ruta}
													target="_blank"
													rel="noopener noreferrer"
													className="block p-4 hover:bg-gradient-to-r hover:from-primary-green/5 hover:to-transparent transition-all group border-b border-slate-100 last:border-0"
													onClick={() => setMostrarResultadosDropdown(false)}
												>
													<div className="flex items-center gap-4">
														<div className="flex-shrink-0">
															<div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${doc.areaColor} flex items-center justify-center shadow-md`}>
																<DocumentTextIcon className="w-7 h-7 text-white" />
															</div>
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-semibold text-slate-900 group-hover:text-primary-green transition-colors truncate mb-1">
																{formatearNombre(doc.nombre)}
															</p>
															<div className="flex items-center gap-2">
																<span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r ${doc.areaColor} text-white shadow-sm`}>
																	{getExtension(doc.nombre)}
																</span>
																<span className="text-xs text-slate-500 truncate font-medium">
																	{doc.area}
																</span>
															</div>
														</div>
														<div className="flex-shrink-0">
															<svg className="w-6 h-6 text-slate-300 group-hover:text-primary-green group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
															</svg>
														</div>
													</div>
												</a>
											))}
										</div>
									) : (
										<div className="p-12 text-center">
											<div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
												<MagnifyingGlassIcon className="w-10 h-10 text-slate-400" />
											</div>
											<p className="text-base font-semibold text-slate-700 mb-2">No se encontraron documentos</p>
											<p className="text-sm text-slate-500">Intenta con otros términos de búsqueda</p>
										</div>
									)}
								</div>
								<div 
									className="fixed inset-0 z-[90]"
									onClick={() => setMostrarResultadosDropdown(false)}
								/>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Vista General Filtrada */}
			<div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden animate-fade-in-up animation-delay-700">
				<div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-gray-200">
					<h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
						<DocumentIcon className="w-6 h-6 text-primary-green" />
						Vista General de Documentos
						{busqueda && (
							<span className="text-sm font-normal text-slate-500">
								({documentosFiltrados.length} filtrado{documentosFiltrados.length !== 1 ? 's' : ''})
							</span>
						)}
					</h2>
				</div>
				
				<div className="p-8">
					<div className="space-y-2">
						{/* Header de tabla */}
						<div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700">
							<div className="col-span-5">Nombre</div>
							<div className="col-span-4">Área</div>
							<div className="col-span-3">Tipo</div>
						</div>

						{/* Listar documentos filtrados */}
						{documentosFiltrados.length > 0 ? (
							<div className="space-y-1">
								{documentosFiltrados.map((doc, index) => (
									<a
										key={index}
										href={doc.ruta}
										target="_blank"
										rel="noopener noreferrer"
										className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors group border border-transparent hover:border-slate-200"
									>
										<div className="col-span-5 flex items-center gap-3">
											<div className={`w-8 h-8 rounded bg-gradient-to-br ${doc.areaColor} flex items-center justify-center flex-shrink-0`}>
												<DocumentTextIcon className="w-5 h-5 text-white" />
											</div>
											<span className="text-sm text-slate-900 group-hover:text-primary-green font-medium truncate">
												{formatearNombre(doc.nombre)}
											</span>
										</div>
										<div className="col-span-4 flex items-center">
											<span className="text-sm text-slate-600 truncate">{doc.area}</span>
										</div>
										<div className="col-span-3 flex items-center">
											<span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gradient-to-r ${doc.areaColor} text-white`}>
												{getExtension(doc.nombre)}
											</span>
										</div>
									</a>
								))}
							</div>
						) : (
							<div className="text-center py-16">
								{busqueda ? (
									<>
										<MagnifyingGlassIcon className="w-20 h-20 text-slate-300 mx-auto mb-4" />
										<p className="text-lg font-semibold text-slate-600 mb-2">No se encontraron documentos</p>
										<p className="text-sm text-slate-400">Intenta con otros términos de búsqueda</p>
									</>
								) : (
									<>
										<FolderIcon className="w-20 h-20 text-slate-300 mx-auto mb-4" />
										<p className="text-lg font-semibold text-slate-600 mb-2">No hay documentos disponibles</p>
										<p className="text-sm text-slate-400">Los documentos aparecerán aquí una vez sean agregados al repositorio</p>
									</>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
