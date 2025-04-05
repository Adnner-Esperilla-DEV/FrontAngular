
export interface AnalysisResponse {
  success: boolean;
  error?: string;
  data?: {
    porcentaje_ascendencia: {
      [key: string]: number;
    };
    snps_analizados: string[];
    total_snps: number;
  };
}
