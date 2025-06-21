function ErrorPage() {
    return (
      <div style={styles.container}>
        <h1>404 - Page non trouvée</h1>
        <p>Désolé, la page que vous recherchez n existe pas.</p>
      </div>
    );
  }
  
  const styles = {
    container: {
      textAlign: "center",
      marginTop: "50px",
    },
  };
  
  export default ErrorPage;