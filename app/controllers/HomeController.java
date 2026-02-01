package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;
import views.html.about;

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
}
