import model.User;

public class JsonRpcTester {

  MangmentDAO dao = new MangmentDAO();

  public void getSayHello(String range) {
    System.out.println("Hello " + range);
    dao.deleteUser();
  }

  public User getTestUser(){
    return dao.getTestUser();
  }
}
