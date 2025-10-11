'use client';

type ArticleAudioProps = {
  audioUrl: string;
};

export function AudioPlayer({ audioUrl }: ArticleAudioProps) {
  if (!audioUrl) return null;

  return (
    <div className="min-w-[300px]">
      <h3 className="text-sm font-semibold mb-2">🔊 Ecouter l'article</h3>
      <audio controls className="w-full bg-transparent">
        <source src={audioUrl} type="audio/mpeg"/>
        Votre navigateur ne supporte pas l'élèment audio
      </audio>
    </div>
  );
}
