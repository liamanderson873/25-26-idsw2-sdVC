
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class TestGenerar {
    public static void main(String[] args) throws Exception {
        String json = "{\"asignaturaId\": 2, \"temaIds\": [3, 4], \"numPreguntas\": 5, \"proporcionesDificultad\": {\"FACIL\": 0.4, \"MEDIO\": 0.4, \"DIFICIL\": 0.2}, \"tipoEvaluacion\": \"PARCIAL\", \"esPersonalizado\": false}";
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8080/api/examenes/generar"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Status: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
}
