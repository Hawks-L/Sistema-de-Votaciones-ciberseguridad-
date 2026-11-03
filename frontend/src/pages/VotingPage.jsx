import { useEffect, useState } from "react";
import { getSedesRequest } from "../api/sedeApi";
import { getFacultadesBySedeRequest } from "../api/facultadApi";
import { getProgramasByFacultadRequest } from "../api/programaApi";
import { getCandidatosByProgramaRequest } from "../api/candidatoApi";
import { createVoteRequest } from "../api/votoApi";

import "../App.css";
import SedeSelect from "../components/SedeSelect";
import FacultadSelect from "../components/FacultadSelect";
import ProgramaSelect from "../components/ProgramaSelect";
import CandidateCard from "../components/CandidateCard";
import VoteForm from "../components/VoteForm";

export default function VotingPage() {
  const [sedes, setSedes] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [candidatos, setCandidatos] = useState([]);

  const [sedeId, setSedeId] = useState("");
  const [facultadId, setFacultadId] = useState("");
  const [programaId, setProgramaId] = useState("");
  const [candidatoId, setCandidatoId] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const data = await getSedesRequest();
        setSedes(data);
      } catch {
        setMessage("Error al cargar las sedes");
      }
    };

    fetchSedes();
  }, []);

  const resetFromSede = () => {
    setFacultadId("");
    setProgramaId("");
    setCandidatoId("");
    setFacultades([]);
    setProgramas([]);
    setCandidatos([]);
  };

  const resetFromFacultad = () => {
    setProgramaId("");
    setCandidatoId("");
    setProgramas([]);
    setCandidatos([]);
  };

  const handleSedeChange = async (e) => {
    const selectedSedeId = e.target.value;
    setSedeId(selectedSedeId);
    setMessage("");
    resetFromSede();

    if (!selectedSedeId) {
      return;
    }

    try {
      const data = await getFacultadesBySedeRequest(selectedSedeId);
      setFacultades(data);
    } catch {
      setMessage("Error al cargar las facultades");
    }
  };

  const handleFacultadChange = async (e) => {
    const selectedFacultadId = e.target.value;
    setFacultadId(selectedFacultadId);
    setMessage("");
    resetFromFacultad();

    if (!selectedFacultadId) {
      return;
    }

    try {
      const data = await getProgramasByFacultadRequest(selectedFacultadId);
      setProgramas(data);
    } catch {
      setMessage("Error al cargar los programas");
    }
  };

  const handleProgramaChange = async (e) => {
    const selectedProgramaId = e.target.value;
    setProgramaId(selectedProgramaId);
    setCandidatoId("");
    setMessage("");
    setCandidatos([]);

    if (!selectedProgramaId) {
      return;
    }

    try {
      const data = await getCandidatosByProgramaRequest(selectedProgramaId);
      setCandidatos(data);
    } catch {
      setMessage("Error al cargar los candidatos");
    }
  };

  const handleVote = async () => {
    try {
      const payload = {
        votante_identificacion: identificacion,
        sede_id: Number(sedeId),
        facultad_id: Number(facultadId),
        programa_id: Number(programaId),
        candidato_id: Number(candidatoId),
      };

      const response = await createVoteRequest(payload);
      setMessage(response.message);

      setIdentificacion("");
      setSedeId("");
      setFacultadId("");
      setProgramaId("");
      setCandidatoId("");
      setFacultades([]);
      setProgramas([]);
      setCandidatos([]);
    } catch (error) {
      const data = error.response?.data;
      setMessage(data?.errors?.[0]?.mensaje || data?.message || "No fue posible registrar el voto");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Sistema de Votación</h1>
        <p>Seleccione sede, facultad, programa y finalmente el candidato habilitado para emitir su voto.</p>
      </div>

      <div className="selectors">
        <SedeSelect sedes={sedes} value={sedeId} onChange={handleSedeChange} />

        <FacultadSelect
          facultades={facultades}
          value={facultadId}
          onChange={handleFacultadChange}
          disabled={!sedeId}
        />

        <ProgramaSelect
          programas={programas}
          value={programaId}
          onChange={handleProgramaChange}
          disabled={!facultadId}
        />
      </div>

      <div className="selection-hint">
        El filtro de votación sigue el flujo: <strong>Sede → Facultad → Programa → Candidato</strong>.
      </div>

      <div className="candidates-grid">
        {candidatos.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            selected={Number(candidatoId) === Number(candidate.id)}
            onSelect={setCandidatoId}
          />
        ))}
      </div>

      <VoteForm
        identificacion={identificacion}
        onChange={(e) => setIdentificacion(e.target.value)}
        onSubmit={handleVote}
        disabled={!identificacion || !sedeId || !facultadId || !programaId || !candidatoId}
      />

      {message && <div className="message-box">{message}</div>}
    </div>
  );
}
