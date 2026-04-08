export default function SedeSelect({ sedes, value, onChange }) {
  return (
    <div className="form-group">
      <label>Sede</label>
      <select value={value} onChange={onChange}>
        <option value="">Seleccione una sede</option>
        {sedes.map((sede) => (
          <option key={sede.id} value={sede.id}>
            {sede.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}