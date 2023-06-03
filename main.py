import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget, QLabel
from PyQt5.QtGui import QFont
import pyqtgraph as pg
from datetime import date
import requests
import time
import random
from bs4 import BeautifulSoup

class Scraper:
    def __init__(self):
        self.session = requests.Session()

    def login(self, username, password):
        login_url = "https://1xbet.ug/auth/login/"

        # Send a GET request to the login page to get the required cookies
        login_response = self.session.get(login_url)
        login_soup = BeautifulSoup(login_response.content, 'html.parser')

        # Find the login form and extract the necessary form data
        csrf_token = login_soup.find('input', attrs={'name': 'csrfmiddlewaretoken'})['value']

        # Prepare the login payload
        login_payload = {
            'csrfmiddlewaretoken': csrf_token,
            'login': username,
            'password': password,
        }

        # Send a POST request to the login URL with the login payload
        self.session.post(login_url, data=login_payload)

    def scrape_matches(self):
        url = "https://1xbet.ug/"
        football_category_link = ""  # Find the football category link as mentioned in the previous code snippet
        football_url = url + football_category_link
        response = self.session.get(football_url)
        football_soup = BeautifulSoup(response.content, 'html.parser')

        # Find the football matches
        football_matches = football_soup.find_all("div", class_="match__team-name")

        match_data = []

        for match in football_matches:
            # Get the previous five head to head matches
            head_to_head_url = url + match['href']  # Assuming the URL is stored in the 'href' attribute
            response = self.session.get(head_to_head_url)
            head_to_head_soup = BeautifulSoup(response.content, 'html.parser')

            head_to_head_matches = head_to_head_soup.find_all("div", class_="head-to-head-match")

            # Calculate the total number of goals in the previous five head to head matches
            total_goals = sum(int(match.find("span", class_="goal").text) for match in head_to_head_matches)

            # Get the match date
            match_date = match.find("div", class_="match-time").text.strip()

            # Add the match data to the list
            match_data.append((match.text.strip(), total_goals, match_date))

        return match_data


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # Set the main window properties
        self.setWindowTitle("Football Match Analysis")
        self.setGeometry(100, 100, 800, 600)
        self.setStyleSheet("background-color: #333333; color: #FFFFFF;")

        # Create the main layout
        main_layout = QVBoxLayout()

        # Create a label for the title
        title_label = QLabel("Football Match Analysis", self)
        title_label.setFont(QFont("Arial", 16))
        title_label.setStyleSheet("color: #FFFFFF; margin: 10px;")

        # Add the title label to the main layout
        main_layout.addWidget(title_label)

        # Create a widget for the graph
        self.graph_widget = pg.PlotWidget()
        self.graph_widget.setBackground("#222222")
        self.graph_widget.setTitle("Total Goals in Previous 5 Matches")
        self.graph_widget.setLabel("left", "Total Goals")
        self.graph_widget.setLabel("bottom", "Match")
        self.graph_widget.showGrid(x=True, y=True)

        # Add the graph widget to the main layout
        main_layout.addWidget(self.graph_widget)

        # Create a central widget and set the main layout
        central_widget = QWidget(self)
        central_widget.setLayout(main_layout)
        self.setCentralWidget(central_widget)

        # Initialize the scraper
        self.scraper = Scraper()

        # Connect the scrape button to the scrape_matches function
        self.scrape_button.clicked.connect(self.scrape_and_update_graph)

    def scrape_and_update_graph(self):
        # Clear the graph
        self.graph_widget.clear()

        # Scrape the matches
        match_data = self.scraper.scrape_matches()

        # Filter matches happening on the current day
        current_date = date.today().strftime("%d.%m.%Y")
        filtered_matches = [(match, goals, date) for match, goals, date in match_data if date == current_date]

        # Extract match names and total goals
        match_names = [match for match, _, _ in filtered_matches]
        total_goals = [goals for _, goals, _ in filtered_matches]

        # Plot the data
        x = list(range(len(match_names)))
        y = total_goals
        self.graph_widget.plot(x, y, pen=pg.mkPen(color="#FFFFFF", width=2), symbol='o', symbolPen='w', symbolBrush='w')

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
