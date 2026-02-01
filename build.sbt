name := "play-knockout"
organization := "example"
version := "1.0-SNAPSHOT"

lazy val root = (project in file("."))
  .enablePlugins(PlayJava)

scalaVersion := "2.13.12"

libraryDependencies += guice

// Listen for debugger on port 9999 when running `sbt run` (no -jvm-debug flag needed)
fork in run := true
javaOptions in run += "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:9999"
