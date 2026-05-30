import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class TestImportar {
    public static void main(String[] args) throws Exception {
        String json = "[\n" +
                "    {\n" +
                "        \"dni\": \"55555555E\",\n" +
                "        \"nombre\": \"Ana\",\n" +
                "        \"apellidos\": \"Garcia\",\n" +
                "        \"codigoGrado\": \"GII\"\n" +
                "    },\n" +
                "    {\n" +
                "        \"dni\": \"66666666F\",\n" +
                "        \"nombre\": \"Carlos\",\n" +
                "        \"apellidos\": \"Ruiz\",\n" +
                "        \"codigoGrado\": \"GII\"\n" +
                "    }\n" +
                "]";
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:9090/api/alumnos/importar"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Status: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
}
