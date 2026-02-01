package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;
import views.html.about;
import views.html.api;

import javax.inject.Inject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HomeController extends Controller {

    @Inject
    public HomeController() {
    }

    public Result index() {
        return ok(index.render());
    }

    public Result about() {
        return ok(about.render());
    }

    public Result api() {
        return ok(api.render());
    }

    public Result quote() {
        try {
            URL url = new URL("https://jsonplaceholder.typicode.com/posts/1");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(10000);
            conn.setRequestProperty("Accept", "application/json");

            int status = conn.getResponseCode();
            if (status != 200) {
                return ok("{\"error\":\"API returned status " + status + "\"}").as("application/json");
            }

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            reader.close();
            return ok(sb.toString()).as("application/json");
        } catch (Exception e) {
            return ok("{\"error\":\"Failed to fetch. See server logs for details.\"}").as("application/json");
        }
    }
}
