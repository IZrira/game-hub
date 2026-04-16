Set shell = CreateObject("WScript.Shell")
' Run the ollama warmup command hidden (0)
shell.Run "ollama run gemma4:e4b ""/bye""", 0, True
