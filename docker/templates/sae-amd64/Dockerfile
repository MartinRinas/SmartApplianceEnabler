FROM amd64/openjdk:11

MAINTAINER Axel Mueller <axel.mueller@avanux.de>

ENV PATH="/usr/bin:${PATH}"
ENV JAVA_OPTS=""
ENV SAE_INSTALL_DIR=/opt/sae
ENV SAE_HOME=/opt/sae/data

EXPOSE 8080

RUN mkdir -p $SAE_INSTALL_DIR && \
    curl -o $SAE_INSTALL_DIR/logback-spring.xml -L -k https://github.com/camueller/SmartApplianceEnabler/raw/master/run/logback-spring.xml && \
    curl -o $SAE_INSTALL_DIR/SmartApplianceEnabler-@project.version@.war -L -k https://github.com/camueller/SmartApplianceEnabler/releases/download/@project.version@/SmartApplianceEnabler-@project.version@.war

CMD java $JAVA_OPTS -Djava.awt.headless=true -Xmx256m -Dsae.home=$SAE_HOME -Dlogging.config=$SAE_INSTALL_DIR/logback-spring.xml -jar $SAE_INSTALL_DIR/SmartApplianceEnabler-@project.version@.war