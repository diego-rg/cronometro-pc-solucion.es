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
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  //Pausar
  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  //Continuar
  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  //Reiniciar
  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  //Formato HH:MM:SS
  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
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
