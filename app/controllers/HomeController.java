package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;
import views.html.about;
import views.html.api;

import javax.inject.Inject;

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
            // Simulate fetching data from a database or business logic
            // In a real app, this would be a service call or repository query
            
            String[] quotes = {
                "Quality is not an act, it is a habit.|Aristotle",
                "The only way to do great work is to love what you do.|Steve Jobs",
                "Innovation distinguishes between a leader and a follower.|Steve Jobs",
                "Code is like humor. When you have to explain it, it's bad.|Cory House",
                "First, solve the problem. Then, write the code.|John Johnson"
            };
            
            // Get a random quote
            int index = (int) (Math.random() * quotes.length);
            String[] parts = quotes[index].split("\\|");
            String content = parts[0];
            String author = parts.length > 1 ? parts[1] : "Unknown";
            
            // Build JSON response
            String json = String.format(
                "{\"title\":\"%s\",\"body\":\"\",\"author\":\"%s\"}",
                content.replace("\"", "\\\""),
                author.replace("\"", "\\\"")
            );
            
            return ok(json).as("application/json");
        } catch (Exception e) {
            return ok("{\"error\":\"Failed to fetch. See server logs for details.\"}").as("application/json");
        }
    }
}
