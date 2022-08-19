import { SOUND } from './constants';

export default function BackgroundSound() {
  return (
    <div display="none">
      {Object.entries(SOUND).map(([type, source]) => (
        <audio key={type} id={`${type}-sound`} src={source} type="audio/mp3" />
      ))}
    </div>
  );
}
