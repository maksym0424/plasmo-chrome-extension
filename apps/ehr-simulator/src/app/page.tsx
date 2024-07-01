"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="fragment">
        <h1 style={{ fontSize: 30, fontWeight: 600, marginBottom: 50 }}>Pridok-simulator</h1>
        <div>
          <div className="row">
            <div
              className="field-rev-list ng-scope ng-hide"
              ng-show="data.field.revisions.length"
              style={{ display: "none" }}
            >
              <div className="border outline white ng-scope">
                <div
                  className="legend extended"
                  ng-click="data.field.clicked($event.currentTarget)"
                >Anamnese (Notat)
                </div>
                <div className="fielddata"><textarea
                  style={{ width: "400px" }}
                  className="form-control ng-pristine ng-valid ng-empty ng-touched"
                ></textarea></div>
                <div className="field-menu" ng-show="!data.field.revisions.length">
                  <div className="field-rev" ng-click="data.field.activateRevisions()">
                    <span className="fal fa-history"></span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="field-rev-list ng-scope ng-hide"
              ng-show="data.field.revisions.length"
              style={{ display: "none" }}
            >
              <div className="border outline white ng-scope">
                <div
                  className="legend extended"
                  ng-click="data.field.clicked($event.currentTarget)"
                >Anamnese (Notat)
                </div>
                <div className="fielddata"><textarea
                  className="form-control ng-pristine ng-valid ng-empty ng-touched"
                ></textarea></div>
                <div className="field-menu" ng-show="!data.field.revisions.length">
                  <div className="field-rev" ng-click="data.field.activateRevisions()">
                    <span className="fal fa-history"></span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="field-rev-list ng-scope ng-hide"
              ng-show="data.field.revisions.length"
              style={{ display: "none" }}
            >
              <div className="border outline white ng-scope">
                <div
                  className="legend extended"
                  ng-click="data.field.clicked($event.currentTarget)"
                >Anamnese (Notat)
                </div>
                <div className="fielddata"><textarea
                  className="form-control ng-pristine ng-valid ng-empty ng-touched"
                ></textarea></div>
                <div className="field-menu" ng-show="!data.field.revisions.length">
                  <div className="field-rev" ng-click="data.field.activateRevisions()">
                    <span className="fal fa-history"></span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="field-rev-list ng-scope ng-hide"
              ng-show="data.field.revisions.length"
              style={{ marginBottom: 20 }}
            >
              <div className="border outline white ng-scope">
                {/*<div*/}
                {/*  className="legend extended"*/}
                {/*  ng-click="data.field.clicked($event.currentTarget)"*/}
                {/*>Anamnese (Notat)*/}
                {/*</div>*/}
                <div
                  className="legend extended"
                  ng-click="data.field.clicked($event.currentTarget)"
                >Subjective
                </div>
                <div className="fielddata"><textarea
                  className="form-control ng-pristine ng-valid ng-empty ng-touched"
                ></textarea></div>
                <div className="field-menu" ng-show="!data.field.revisions.length">
                  <div className="field-rev" ng-click="data.field.activateRevisions()">
                    <span className="fal fa-history"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="field-rev-list ng-scope ng-hide"
                ng-show="data.field.revisions.length"
                style={{ marginBottom: 20 }}
              >
                <div className="border outline white ng-scope">
                  {/*<div className="legend extended" ng-click="data.field.clicked($event.currentTarget)">Funn</div>*/}
                  <div className="legend extended" ng-click="data.field.clicked($event.currentTarget)">Objective</div>
                  <div className="fielddata"><textarea
                    className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                  ></textarea></div>
                  <div className="field-menu" ng-show="!data.field.revisions.length">
                    <div className="field-rev" ng-click="data.field.activateRevisions()">
                      <span className="fal fa-history"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="field-rev-list ng-scope ng-hide"
                  ng-show="data.field.revisions.length"
                  style={{ marginBottom: 20 }}
                >
                  <div className="border outline white ng-scope">
                    {/*<div className="legend extended" ng-click="data.field.clicked($event.currentTarget)">Vurdering</div>*/}
                    <div className="legend extended" ng-click="data.field.clicked($event.currentTarget)">Assessment</div>
                    <div className="fielddata"><textarea
                      className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                    ></textarea></div>
                    <div className="field-menu" ng-show="!data.field.revisions.length">
                      <div className="field-rev" ng-click="data.field.activateRevisions()">
                        <span className="fal fa-history"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="field-rev-list ng-scope ng-hide"
                    ng-show="data.field.revisions.length"
                    style={{ marginBottom: 20 }}
                  >
                    <div className="border outline white ng-scope">
                      {/*<div className="legend extended" ng-click="data.field.clicked($event.currentTarget)">Tiltak</div>*/}
                      <div className="legend extended" ng-click="data.field.clicked($event.currentTarget)">Plan</div>
                      <div className="fielddata"><textarea
                        className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                      ></textarea></div>
                      <div className="field-menu" ng-show="!data.field.revisions.length">
                        <div className="field-rev" ng-click="data.field.activateRevisions()">
                          <span className="fal fa-history"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<div className="row">*/}
                  {/*  <div*/}
                  {/*    className="field-rev-list ng-scope ng-hide"*/}
                  {/*    ng-show="data.field.revisions.length"*/}
                  {/*    style={{ marginBottom: 20 }}*/}
                  {/*  >*/}
                  {/*    <div className="border outline white ng-scope">*/}
                  {/*      <div className="legend extended" ng-click="data.field.clicked($event.currentTarget)">Gul lapp*/}
                  {/*        (kun*/}
                  {/*        synlig for*/}
                  {/*        pålogget behandler)*/}
                  {/*      </div>*/}
                  {/*      <div className="fielddata"><textarea*/}
                  {/*        className="form-control ng-pristine ng-untouched ng-valid ng-empty"*/}
                  {/*      ></textarea></div>*/}
                  {/*      <div className="field-menu" ng-show="!data.field.revisions.length">*/}
                  {/*        <div className="field-rev" ng-click="data.field.activateRevisions()">*/}
                  {/*          <span className="fal fa-history"></span>*/}
                  {/*        </div>*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
