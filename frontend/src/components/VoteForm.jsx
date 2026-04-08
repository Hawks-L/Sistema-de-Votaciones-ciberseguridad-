export default function VoteForm({ identificacion, onChange, onSubmit, disabled }) {
  return (
    <div className="vote-form">
      <label>Identificación del votante</label>
      <input
        type="text"
        value={identificacion}
        onChange={onChange}
        placeholder="Ingrese la identificación"
      />

      <button onClick={onSubmit} disabled={disabled}>
        Registrar voto
      </button>
    </div>
  );
}