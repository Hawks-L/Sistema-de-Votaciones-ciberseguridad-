export default function CandidateCard({ candidate, selected, onSelect }) {
  return (
    <div className={`candidate-card ${selected ? "selected" : ""}`}>
      <img src={candidate.foto_url} alt={candidate.nombre} />
      <h3>{candidate.nombre}</h3>
      <p>{candidate.propuesta}</p>

      <button onClick={() => onSelect(candidate.id)}>
        {selected ? "Seleccionado" : "Seleccionar"}
      </button>
    </div>
  );
}