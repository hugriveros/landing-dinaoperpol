import { useState } from 'react';

interface Area {
	id: number;
	title: string;
	nombreJefe: string;
	fotoJefe: string;
	desc: string;
	responsabilidades: string[];
	contactoAnexo: string;
}

interface Props {
	areas: Area[];
	baseUrl: string;
}

export default function AreasGabineteTecnico({ areas, baseUrl }: Props) {
	const [expandedAreas, setExpandedAreas] = useState<Set<number>>(new Set());

	const toggleArea = (areaId: number) => {
		setExpandedAreas(prev => {
			const newSet = new Set(prev);
			if (newSet.has(areaId)) {
				newSet.delete(areaId);
			} else {
				newSet.add(areaId);
			}
			return newSet;
		});
	};

	return (
		<div className="bg-gray-50 rounded-lg p-4">
			<p className="text-xs font-semibold text-gray-700 mb-4 text-center">Áreas:</p>
			<div className="space-y-3">
				{areas.map((area) => {
					const isExpanded = expandedAreas.has(area.id);
					
					return (
						<div key={area.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-500 ease-in-out hover:shadow-md">
							<button 
								className="w-full p-3 text-left hover:bg-gray-50 transition-all duration-500 ease-in-out cursor-pointer group"
								onClick={() => toggleArea(area.id)}
							>
								<div className="flex items-start gap-3">
									<div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden border-2 border-primary-green/30 flex-shrink-0 transition-all duration-500 ease-in-out group-hover:border-primary-green/50 group-hover:scale-105">
										<img
											src={`${baseUrl}${area.fotoJefe}`}
											alt={`Jefe de ${area.title}`}
											className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
										/>
									</div>
									<div className="flex-1">
										<div className="flex items-start justify-between gap-2">
											<h5 className="text-xs font-bold text-slate-900 leading-tight transition-colors duration-500 ease-in-out group-hover:text-primary-green">{area.title}</h5>
											<svg 
												className="w-5 h-5 text-primary-green transition-all duration-700 ease-in-out flex-shrink-0"
												style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
												fill="none" 
												stroke="currentColor" 
												viewBox="0 0 24 24"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</div>
										<p className="text-xs text-slate-600 mt-1 transition-colors duration-500 ease-in-out group-hover:text-slate-800">{area.desc}</p>
									</div>
								</div>
							</button>
							
							<div 
								className={`transition-all duration-700 ease-in-out overflow-hidden ${
									isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
								}`}
							>
								<div className="px-3 pb-3 pt-2 border-t border-gray-100">
									<div className="mb-3 p-3 bg-gray-50 rounded-lg transition-all duration-500 ease-in-out hover:bg-gray-100">
										<p className="text-xs text-gray-500 font-medium mb-1">Jefe de Área</p>
										{area.nombreJefe ? (
											<p className="text-sm text-primary-green font-bold">{area.nombreJefe}</p>
										) : (
											<p className="text-xs text-gray-400 italic">Por designar</p>
										)}
									</div>
									
									<div className="space-y-2">
										<div className="p-2 bg-gray-50 rounded transition-all duration-500 ease-in-out hover:bg-gray-100 hover:shadow-sm">
											<p className="text-xs font-semibold text-text-dark mb-1">Responsabilidades Principales:</p>
											<ul className="text-xs text-text-dark space-y-1 ml-3">
												{area.responsabilidades.map((resp, idx) => (
													<li key={idx}>• {resp}</li>
												))}
											</ul>
										</div>
										<div className="p-2 bg-gray-50  rounded transition-all duration-500 ease-in-out hover:bg-gray-100 hover:shadow-sm">
											<p className="text-xs font-semibold text-text-dark mb-1">Contacto:</p>
											
											<p className="text-xs text-text-dark">Anexo: {area.contactoAnexo}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
