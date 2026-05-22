import os
import sys

# Pillow가 없을 경우 자동 설치 시도
try:
    from PIL import Image
except ImportError:
    print("Pillow library not found. Attempting to install Pillow...")
    import subprocess
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
        from PIL import Image
        print("Pillow installed successfully.")
    except Exception as e:
        print(f"Failed to install Pillow: {e}")
        sys.exit(1)

# 경로 정의
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")

# 로고 이미지 경로 (conversation artifacts 디렉토리)
LOGO_PATH = r"C:\Users\User\.gemini\antigravity\brain\07045160-9843-4a92-acaf-3311204e1fc3\artifacts\rira_archive_logo.png"

def generate_icons():
    if not os.path.exists(LOGO_PATH):
        print(f"Error: Original logo not found at {LOGO_PATH}")
        sys.exit(1)

    if not os.path.exists(PUBLIC_DIR):
        os.makedirs(PUBLIC_DIR)
        print(f"Created public directory at {PUBLIC_DIR}")

    try:
        with Image.open(LOGO_PATH) as img:
            # 1. favicon.ico 생성 (다중 해상도 16x16, 24x24, 32x32, 48x48, 64x64 지원)
            ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")
            img.save(
                ico_path, 
                format="ICO", 
                sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64)]
            )
            print(f"Generated multi-resolution favicon.ico at: {ico_path}")

            # 2. logo192.png (192x192) 생성
            logo192_path = os.path.join(PUBLIC_DIR, "logo192.png")
            img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
            img_192.save(logo192_path, format="PNG")
            print(f"Generated logo192.png at: {logo192_path}")

            # 3. logo512.png (512x512) 생성
            logo512_path = os.path.join(PUBLIC_DIR, "logo512.png")
            img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
            img_512.save(logo512_path, format="PNG")
            print(f"Generated logo512.png at: {logo512_path}")

            # 4. apple-touch-icon.png (180x180) 생성
            apple_path = os.path.join(PUBLIC_DIR, "apple-touch-icon.png")
            img_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
            img_180.save(apple_path, format="PNG")
            print(f"Generated apple-touch-icon.png at: {apple_path}")

        print("All favicon assets generated successfully!")

    except Exception as e:
        print(f"Failed to generate icons: {e}")
        sys.exit(1)

if __name__ == "__main__":
    generate_icons()
