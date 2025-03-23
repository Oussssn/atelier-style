    #!/bin/bash

# Colors for output
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NC="\033[0m" # No Color

# Function to print colored messages
print_message() {
    echo -e "${GREEN}==>${NC} $1"
}

# Function to print warnings
print_warning() {
    echo -e "${YELLOW}Warning:${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_warning "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    print_warning "Python3 is not installed. Please install Python3 first."
    exit 1
fi

# Virtual environment directory
VENV_DIR=".venv"

# Function to install dependencies
install_deps() {
    print_message "Installing Node.js dependencies..."
    npm install

    print_message "Setting up Python virtual environment..."
    python3 -m venv "$VENV_DIR"
    source "$VENV_DIR/bin/activate"
    pip install --upgrade pip
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    fi
}

# Function to start development server
dev() {
    print_message "Starting development server..."
    npm run dev
}

# Function to build for production
build() {
    print_message "Building for production..."
    npm run build
}

# Function to run tests
test() {
    print_message "Running tests..."
    npm run test
}

# Function to activate virtual environment
activate_venv() {
    if [ -d "$VENV_DIR" ]; then
        source "$VENV_DIR/bin/activate"
    else
        print_warning "Virtual environment not found. Run './build.sh install' first."
        exit 1
    fi
}

# Function to show help message
show_help() {
    echo "Usage: ./build.sh [command]"
    echo ""
    echo "Commands:"
    echo "  install    Install project dependencies and set up virtual environment"
    echo "  dev        Start development server"
    echo "  build      Build for production"
    echo "  test       Run tests"
    echo "  venv       Activate Python virtual environment"
    echo "  help       Show this help message"
}

# Main script logic
case "$1" in
    "install")
        install_deps
        ;;
    "dev")
        activate_venv
        dev
        ;;
    "build")
        activate_venv
        build
        ;;
    "test")
        activate_venv
        test
        ;;
    "venv")
        activate_venv
        print_message "Virtual environment activated. Run 'deactivate' to exit."
        ;;
    "help")
        show_help
        ;;
    "")
        show_help
        ;;
    *)
        print_warning "Unknown command: $1"
        show_help
        exit 1
        ;;
esac