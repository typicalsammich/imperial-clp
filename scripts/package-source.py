from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
destination = root.parent / 'Imperial-Crown-Cinematic-Website-v3.zip'
with ZipFile(destination, 'w', compression=ZIP_DEFLATED, compresslevel=6) as archive:
    for path in sorted(root.rglob('*')):
        relative = path.relative_to(root)
        if any(part in {'.next', 'node_modules', '.git', '__pycache__'} for part in relative.parts):
            continue
        if path.name.startswith('.env') and path.name != '.env.example':
            continue
        if path.is_file():
            archive.write(path, Path('imperial-crown') / relative)
print(f'{destination} ({destination.stat().st_size / 1024 / 1024:.1f} MB)')

