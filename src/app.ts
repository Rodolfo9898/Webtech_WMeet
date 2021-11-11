import * as express from 'express';
import * as session from 'express-session';
import { BaseController } from "./controllers/base.controller";
import { StartController } from "./controllers/start.controller";
import * as path from 'path';

export class App {
    app: express.Application;
    port: number = 5555;
    controllers: Map<string, BaseController> = new Map();
    path: string = "";

    constructor() {
        this.app = express();

        this._initializeMiddleware();
        this._initializeControllers();
        this.listen();
    }

    private _initializeControllers(): void {
        this.addController(new StartController());
        //this.addController(new User.db.controller())

        // We link the router of each controller to our server
        this.controllers.forEach(controller => {
            this.app.use(`${this.path}${controller.path}`, controller.router);
        });
    }

    public addController(controller: BaseController): void {
        this.controllers.set(controller.constructor.name, controller);
    }

    private _initializeMiddleware(): void {
        this.app.use(express.urlencoded({ extended: true }));

        //this.app.use( express.static( "public" ) );
        // Static Files
        this.app.use(express.static('static'));
        this.app.use('/css', express.static(path.join(__dirname, 'static/css')))
        this.app.use('/js', express.static(path.join(__dirname, 'static/js')))
        this.app.use('/img', express.static(path.join(__dirname, 'static/img')))
        
        // Set View's
        this.app.set('views', './views');
        this.app.set('view engine', 'ejs');
        this.app.use(session({ //Specifies the boolean value for the Secure Set-Cookie attribute
            secret: 'test',
            resave: true,
            saveUninitialized: true
        }));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on http://localhost:${this.port}`);
        });
    }

}
export default new App();
