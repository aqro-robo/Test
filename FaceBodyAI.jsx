import React, { useState } from 'react';

const FaceBodyAI = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('faceImage', image);

    try {
      const res = await fetch('http://localhost:7000/api/facebody/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Upload or analysis failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>👤 Face & Body AI – Analyze Your Face</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: 200, marginTop: 10 }} />}
      <div>
        <button onClick={handleUpload} disabled={loading || !image}>
          {loading ? 'Analyzing...' : 'Upload & Analyze'}
        </button>
      </div>
      {result && (
        <div style={{ marginTop: 20 }}>
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : (
            <>
              <p>Age: {result.analysis.age}</p>
              <p>Gender: {result.analysis.gender}</p>
              <p>Emotion: {result.analysis.emotion}</p>
              <p>Attractiveness: {result.analysis.attractiveness}</p>
              <p>3D Model: <a href={result.analysis.modelUrl} target="_blank" rel="noreferrer">Download .glb</a></p>
              <img src={result.imageUrl} alt="Analyzed Face" style={{ width: 200, marginTop: 10 }} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FaceBodyAI;
