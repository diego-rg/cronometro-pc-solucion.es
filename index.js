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

  return (
    <div>
      <h3>React Stopwatch</h3>
      <div className="stopwatch-card">
        <p>{timer}</p> {/* here we will show timer */}
        <div className="buttons">
          <button onClick={handleStart}>Iniciar</button>
          <button onClick={handlePause}>Pausar</button>
          <button onClick={handleResume}>Continuar</button>
          <button onClick={handleReset}>Reiniciar</button>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
