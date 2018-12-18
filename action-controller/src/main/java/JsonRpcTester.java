public class JsonRpcTester {

  public void getSayHello(String range) {
    System.out.println("Hello " + range);
    MangmentDAO dao = new MangmentDAO();
    dao.deleteUser();
  }
}
