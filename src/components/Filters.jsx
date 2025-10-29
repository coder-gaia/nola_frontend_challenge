import { Input, Select, Wrap } from "../styles/FiltersStyles";

export default function Filters({ start, end, channel, channels, onChange }) {
  return (
    <Wrap>
      <label>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Start</div>
        <Input
          type="date"
          value={start}
          onChange={(e) => onChange({ start: e.target.value })}
        />
      </label>

      <label>
        <div style={{ fontSize: 12, color: "#6b7280" }}>End</div>
        <Input
          type="date"
          value={end}
          onChange={(e) => onChange({ end: e.target.value })}
        />
      </label>

      <label>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Channel</div>
        <Select
          value={channel || ""}
          onChange={(e) => onChange({ channel: e.target.value || null })}
        >
          <option value="">All channels</option>
          {channels.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </label>
    </Wrap>
  );
}
