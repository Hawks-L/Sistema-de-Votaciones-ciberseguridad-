export default function FacultadSelect({ facultades, value, onChange, disabled }) {
  return (
    <div className="form-group">
      <label>Facultad</label>
      <select value={value} onChange={onChange} disabled={disabled}>
        <option value="">Seleccione una facultad</option>
        {facultades.map((facultad) => (
          <option key={facultad.id} value={facultad.id}>
            {facultad.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}