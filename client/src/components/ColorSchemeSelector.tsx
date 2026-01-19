import { colorSchemes } from "../assets/assets"

const ColorSchemeSelector = ({
  value,
  onChange,
}: {
  value: string
  onChange: (color: string) => void
}) => {
  const selectedScheme = colorSchemes.find((s) => s.id === value)

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-200">
        Color Scheme
      </label>

      <div className="grid grid-cols-6 gap-3">
        {colorSchemes.map((scheme) => {
          const isSelected = value === scheme.id

          return (
            <button
              key={scheme.id}
              type="button"
              onClick={() => onChange(scheme.id)}
              aria-pressed={isSelected}
              title={scheme.name}
              className={`relative rounded-lg transition-all
                ${isSelected ? "ring-2 ring-indigo-500 scale-[1.02]" : "hover:ring-1 hover:ring-zinc-600"}
              `}
            >
              <div className="flex h-10 overflow-hidden rounded-lg">
                {scheme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          )
        })}
      </div>

      {selectedScheme && (
        <p className="text-xs text-zinc-400">
          Selected: <span className="text-zinc-200">{selectedScheme.name}</span>
        </p>
      )}
    </div>
  )
}

export default ColorSchemeSelector
