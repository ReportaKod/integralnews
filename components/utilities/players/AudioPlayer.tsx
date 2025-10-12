'use client';

type ArticleAudioProps = {
  audioUrl: string;
  title?: string;
};

export function AudioPlayer({ audioUrl, title = "🔊 Ecouter l'article" }: ArticleAudioProps) {
  if (!audioUrl) return null;

  return (
    <div className="w-full min-w-[300px] max-w-[600px]">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <audio controls className="w-full bg-transparent">
        <source src={audioUrl} type="audio/mpeg"/>
        Votre navigateur ne supporte pas l'élèment audio
      </audio>
    </div>
  );
}
