import { pinyin } from "pinyin-pro";

const hanPattern = /\p{Script=Han}/u;

function getPinyin(char: string) {
  return pinyin(char, { toneType: "symbol", type: "array" })[0] ?? char;
}

export function RubyText({ children }: { children: string | number }) {
  const text = String(children);

  return (
    <span className="ruby-text">
      {Array.from(text).map((char, index) => {
        if (!hanPattern.test(char)) return <span key={`${char}-${index}`}>{char}</span>;

        return (
          <ruby key={`${char}-${index}`}>
            {char}
            <rp>(</rp>
            <rt>{getPinyin(char)}</rt>
            <rp>)</rp>
          </ruby>
        );
      })}
    </span>
  );
}
