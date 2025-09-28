import { useEffect, useRef, useState } from "react";
import { buscarParticipante } from "../api/participantesService";

/**
 * Hook para resolver (e cachear) participantes por ID.
 * Evita refetch redundante entre renders/tabelas.
 *
 * @param {Array<number>} participanteIds lista de IDs presentes na view
 * @returns {{ participantesMap: Record<number, any>, loading: boolean, getParticipante: (id:number)=>any }}
 */
export function useParticipantesLookup(participanteIds = []) {
  const [participantesMap, setParticipantesMap] = useState({});
  const [loading, setLoading] = useState(false);
  const inFlight = useRef(new Set());
  const cacheRef = useRef({});

  useEffect(() => {
    const uniqueIds = [...new Set(participanteIds.filter(Boolean))];
    // Calcula missing com base no snapshot atual (sem colocar o objeto inteiro nas deps)
    const missing = uniqueIds.filter(
      (id) => cacheRef.current[id] === undefined && !inFlight.current.has(id)
    );
    if (missing.length === 0) return;

    let cancelled = false;
    setLoading(true);
    missing.forEach((id) => inFlight.current.add(id));

    (async () => {
      const results = await Promise.all(
        missing.map(async (id) => {
          try {
            const data = await buscarParticipante(id);
            return { id, data };
          } catch {
            return { id, data: null, error: true };
          }
        })
      );
      if (cancelled) return;
      let mutated = false;
      results.forEach(({ id, data, error }) => {
        const value = error ? null : data;
        if (cacheRef.current[id] !== value) {
          cacheRef.current[id] = value;
          mutated = true;
        }
      });
      if (mutated) {
        // dispara atualização única
        setParticipantesMap({ ...cacheRef.current });
      }
      missing.forEach((id) => inFlight.current.delete(id));
      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [participanteIds]);

  const getParticipante = (id) => participantesMap[id];

  return { participantesMap, loading, getParticipante };
}

export default useParticipantesLookup;
