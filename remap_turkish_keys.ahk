#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
NumpadDot::.  ;
+SC17::I  ;
SC17::i  ;
+SC28::İ  ;
SC28::ı  ;
+SC29::
send, ``%A_Space%
return  ;