const App = () => {
  const { useState, useRef, useEffect } = React;

  //---Gestión del estado
  //Gestión inicio cronómetro
  const [timer, setTimer] = useState(0);
  //Gestión cronómetro activo
  const [isActive, setIsActive] = useState(false);
  //Gestión pausa
  const [isPaused, setIsPaused] = useState(false);
  //Valor actual
  const countRef = useRef(null);

  //---Funciones
  //Iniciar
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    const start = Date.now();
    countRef.current = setInterval(() => {
      const diff = Date.now() - start;
      setTimer(diff);
    }, 1);
  };

  //Pausar
  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  //Continuar
  const handleResume = () => {
    setIsPaused(true);
    const start = Date.now();
    countRef.current = setInterval(() => {
      const diff = Date.now() - start + timer;
      setTimer(diff);
    }, 1);
  };

  //Reiniciar
  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  //Formato HH:MM:SS:MS
  const formatTime = () => {
    const getMiliseconds = Math.floor((timer % 1000) / 10);
    const getSeconds = Math.floor((timer / 1000) % 60);
    const getMinutes = Math.floor((timer / (1000 * 60)) % 60);
    const getHours = Math.floor((timer / (1000 * 60 * 60)) % 24);

    const miliseconds =
      getMiliseconds < 10 ? "0" + getMiliseconds : getMiliseconds;
    const hours = getHours < 10 ? "0" + getHours : getHours;
    const minutes = getMinutes < 10 ? "0" + getMinutes : getMinutes;
    const seconds = getSeconds < 10 ? "0" + getSeconds : getSeconds;

    return `${hours} : ${minutes} : ${seconds} : ${miliseconds}`;
  };

  //Actualizar title:
  useEffect(() => {
    document.title = formatTime();
  }, [formatTime]);

  return (
    <div>
      <main>
        <h1>Cronómetro</h1>
        <div>
          <p>{formatTime()}</p>
          <div>
            {!isActive && !isPaused ? (
              <button onClick={handleStart}>Iniciar</button>
            ) : isPaused ? (
              <button onClick={handlePause}>Pausar</button>
            ) : (
              <button onClick={handleResume}>Continuar</button>
            )}
            <button onClick={handleReset} disabled={!isActive}>
              Reiniciar
            </button>
          </div>
        </div>
      </main>
      <footer> © 2013 - 2022 PC-Solución.</footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
