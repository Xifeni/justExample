package exception;


public class WrongPermission extends Exception {

    public WrongPermission(){
        super("Access denied");
    }
}
