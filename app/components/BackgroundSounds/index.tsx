import { SOUNDS } from './constants';

export default function BackgroundSounds() {
  return (
    <div display="none">
      {Object.entries(SOUNDS).map(([type, source]) => (
        <audio key={type} id={`${type}-sound`} src={source} type="audio/mp3" />
      ))}
    </div>
  );
}
