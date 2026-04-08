export default function ProgramaSelect({ programas, value, onChange, disabled }) {
  return (
    <div className="form-group">
      <label>Programa</label>
      <select value={value} onChange={onChange} disabled={disabled}>
        <option value="">Seleccione un programa</option>
        {programas.map((programa) => (
          <option key={programa.id} value={programa.id}>
            {programa.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
